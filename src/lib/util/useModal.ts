import type { Modal, CommandInteraction } from 'discord.js';

export const useModal = async (interaction: CommandInteraction, modal: Modal, id: string, timeout = 120_000) => {
	await interaction.showModal(modal);

	return interaction.awaitModalSubmit({ time: timeout, filter: (i) => i.customId === `modal-${id}` }).catch(() => null);
};
