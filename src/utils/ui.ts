export function Notification(message: string, duration: string) {
	SendNuiMessage(
		JSON.stringify({
			message: message,
			duration: duration
		})
	)
}