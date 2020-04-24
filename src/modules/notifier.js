const updateNotifier = require('update-notifier');

export function notifyUpdate(package, interval=100 * 60 * 60 * 1) {
	updateNotifier({package, updateCheckInterval: interval}).notify();
}
