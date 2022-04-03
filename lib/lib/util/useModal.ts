import type { Modal, CommandInteraction, ModalSubmitInteraction } from 'discord.js';

export const useModal = async (
	interaction: CommandInteraction,
	modal: Modal,
	id: string,
	timeout = 120_000
): Promise<ModalSubmitInteraction | null> => {
	await interaction.showModal(modal);

	return interaction.awaitModalSubmit({ time: timeout, filter: (i) => i.customId === `modal-${id}` }).catch(() => null);
};
