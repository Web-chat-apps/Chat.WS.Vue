export type ChatMessageType = {
	uuid: string;
	message: string;
	time: string;
};

export interface Room {
	messages: Message[];
	users: User[];
}

export interface User {
	socket_id: string;
	displayName: string;
}

export interface Message {
	sender: string;
	senderId: string;
	text: string;
	isCurrentUser: boolean;
	time: string;
}
