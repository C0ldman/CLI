const updateNotifier = require('update-notifier');

export function notifyUpdate(pkg, intervalForNotify=100 * 60 * 60 * 1) {
	updateNotifier({pkg, updateCheckInterval: intervalForNotify}).notify();
}
