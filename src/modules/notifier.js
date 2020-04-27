const updateNotifier = require('update-notifier');

export function notifyUpdate(packageFile, intervalForNotify=100 * 60 * 60 * 1) {
	updateNotifier({packageFile, updateCheckInterval: intervalForNotify}).notify();
}
