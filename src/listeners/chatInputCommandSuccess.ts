import { getSuccessLoggerData } from '#util/logger/success';
import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, type ChatInputCommandSuccessPayload } from '@sapphire/framework';

@ApplyOptions<Listener.Options>({ event: Events.ChatInputCommandSuccess })
export class ChatInputCommandSuccessListener extends Listener {
	public override run(payload: ChatInputCommandSuccessPayload) {
		const { author, commandName, sentAt, shard, runtime } = getSuccessLoggerData(payload);
		this.container.logger.debug(`${shard} - ${commandName} ${author} ${sentAt} (${runtime})`);
	}
}
