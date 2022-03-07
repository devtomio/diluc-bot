import { Command, RegisterBehavior, type ChatInputCommand } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { useModal } from '#util/useModal';
import { CommandInteraction, Modal, type Message } from 'discord.js';
import { isNullish, isThenable, codeBlock } from '@sapphire/utilities';
import { randomUUID } from 'node:crypto';
import { Stopwatch } from '@sapphire/stopwatch';
import { Type } from '@sapphire/type';
import { inspect } from 'node:util';
import { clean } from '#util/clean';
import { cast } from '#util/cast';
import { setTimeout as sleep } from 'node:timers/promises';
import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { canSendAttachments } from '@sapphire/discord.js-utilities';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Evaluates arbitrary JavaScript code. (only for owners)',
	chatInputCommand: {
		register: true
	}
})
export class SlashCommand extends Command {
	public override registerApplicationCommands(...[registry]: Parameters<ChatInputCommand['registerApplicationCommands']>) {
		registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description).setDefaultPermission(true), {
			idHints: ['950037783114817576'],
			behaviorWhenNotIdentical: RegisterBehavior.Overwrite
		});
	}

	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		if (interaction.user.id !== '566155739652030465')
			return interaction.reply({ content: "You don't have permissions to use this command.", ephemeral: true });

		const modalId = randomUUID();
		const modal = new Modal({
			customId: `modal-${modalId}`,
			title: 'Eval Command',
			components: [
				{
					type: 'ACTION_ROW',
					components: [
						{
							type: 'TEXT_INPUT',
							style: 'PARAGRAPH',
							label: 'Code to Evaluate',
							customId: `modal-${interaction.id}`
						}
					]
				},
				{
					type: 'ACTION_ROW',
					components: [
						{
							type: 'TEXT_INPUT',
							style: 'SHORT',
							label: 'Flags',
							customId: `flags-${interaction.id}`
						}
					]
				}
			]
		});

		const submittedModal = await useModal(interaction, modal, modalId);

		if (isNullish(submittedModal)) return interaction.reply({ content: 'You took too long to submit.', ephemeral: true });

		const msg = cast<Message>(await submittedModal.reply({ content: 'Loading...', fetchReply: true }));
		const code = submittedModal.fields.getTextInputValue(`modal-${interaction.id}`);
		const flags = submittedModal.fields.getTextInputValue(`flags-${interaction.id}`).split(', ');
		const flagTime = flags.includes('no-timeout') ? 60_000 : Infinity;
		const language = flags.includes('json') ? 'json' : 'js';
		const { success, result, time, type } = await this.timedEval(interaction, code, flags, flagTime);

		if (flags.includes('silent')) {
			if (!success && result && cast<Error>(result).stack) this.container.logger.fatal(cast<Error>(result).stack);
			return msg.edit('Silent.');
		}

		const footer = `**Type**:\n${codeBlock('ts', type)}`;

		if (flags.includes('file') && canSendAttachments(interaction.channel)) {
			const content = [result, footer, time].filter(Boolean).join('\n');
			const ext = '.txt';
			const attachment = Buffer.from(content ?? result);
			const name = `output${ext}`;

			return msg.edit({ content: 'Sent the output as a file.', files: [{ attachment, name }] });
		} else if (flags.includes('haste')) {
			const url = await this.uploadHaste(result);
			const content = [`<${url}>`, footer, time].filter(Boolean).join('\n');

			return msg.edit(content);
		}

		if (result.length > 1950) {
			const url = await this.uploadHaste(result);
			const content = [url, footer, time].filter(Boolean).join('\n');

			return msg.edit(content);
		}

		if (success) {
			const content = [`**Output**: ${codeBlock(language, result)}`, footer, time].filter(Boolean).join('\n');

			return msg.edit(content);
		}

		const output = codeBlock(language, result);
		const content = `**Error**: ${output}\n**Type**: ${type}\n${time}`;

		return msg.edit(content);
	}

	private async timedEval(interaction: CommandInteraction, code: string, flags: string[], flagTime: number) {
		if (flagTime === Infinity || flagTime === 0) return this.eval(interaction, code, flags);

		return Promise.race([
			sleep(flagTime).then(() => ({
				result: 'The result took too long.',
				success: false,
				time: '⏱ ...',
				type: 'EvalTimeoutError'
			})),
			this.eval(interaction, code, flags)
		]);
	}

	// @ts-expect-error For eval purposes
	private async eval(interaction: CommandInteraction, code: string, flags: string[]) {
		const stopwatch = new Stopwatch();
		let success: boolean;
		let syncTime = '';
		let asyncTime = '';
		let result: unknown;
		let thenable = false;
		let type: Type;

		try {
			if (flags.includes('async')) code = `(async () => {\n${code}\n})();`;

			// eslint-disable-next-line no-eval
			result = eval(code);
			syncTime = stopwatch.toString();
			type = new Type(result);

			if (isThenable(result)) {
				thenable = true;
				stopwatch.restart();
				result = await result;
				asyncTime = stopwatch.toString();
			}

			success = true;
		} catch (error) {
			if (!syncTime.length) syncTime = stopwatch.toString();
			if (thenable && !asyncTime.length) asyncTime = stopwatch.toString();
			if (!type!) type = new Type(error);

			result = error;
			success = false;
		}

		stopwatch.stop();

		if (typeof result !== 'string')
			result =
				result instanceof Error
					? result.stack
					: flags.includes('json')
					? JSON.stringify(result, null, 4)
					: inspect(result, {
							depth: 0,
							showHidden: flags.includes('hidden')
					  });

		return {
			success,
			type: type!,
			time: this.formatTime(syncTime, asyncTime ?? ''),
			result: clean(cast(result))
		};
	}

	private formatTime(syncTime: string, asyncTime?: string) {
		return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
	}

	private async uploadHaste(result: string) {
		const { key } = await fetch<{ key: string }>(
			'https://www.toptal.com/developers/hastebin/documents',
			{
				body: result,
				headers: {
					'Content-Type': 'text/plain'
				},
				method: FetchMethods.Post
			},
			FetchResultTypes.JSON
		);

		return `https://www.toptal.com/developers/hastebin/${key}`;
	}
}
