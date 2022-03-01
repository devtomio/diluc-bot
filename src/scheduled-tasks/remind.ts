import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';
import type { User } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { ApplyOptions } from '@sapphire/decorators';

interface Payload {
	user: User;
	channelId: string;
	reminder: string;
	messageId: string;
	guildId: string;
}

@ApplyOptions<ScheduledTask.Options>({
	bullJobOptions: {
		removeOnComplete: true,
		removeOnFail: true
	}
})
export class ManualTask extends ScheduledTask {
	public async run(payload: Payload) {
		const { user, channelId, reminder, messageId, guildId } = payload;

		await this.container.rest.post(Routes.channelMessages(channelId), {
			body: {
				content: `<@${user.id}> I'm reminding you of: "${reminder}".`,
				allowed_mentions: {
					users: [user.id]
				},
				message_reference: {
					message_id: messageId,
					channel_id: channelId,
					guild_id: guildId
				}
			}
		});
	}
}
