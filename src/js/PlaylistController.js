var app = require('./app');


class PlaylistController {
	constructor(
		PlaylistService,
		PlaylistItemFormService
	) {
		this.selectedItem = null;
		this.visiblePlaylist = true;
		this.visibleSeriesForm = false;

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
	}
	addItem() {
		this.PlaylistItemFormService.clear();
		this.displaySeriesForm();
	}
	editItem(item) {
		this.PlaylistItemFormService.setValues(item);
		this.displaySeriesForm();
	}
	getListItems() {
		return this.PlaylistService.list();
	}
	displayPlaylist() {
		this.visiblePlaylist = true;
		this.visibleSeriesForm = false;
	}
	displaySeriesForm() {
		this.visiblePlaylist = false;
		this.visibleSeriesForm = true;
	}
	openNextURL(item) {
		item.url = item.nextURL;
		this.PlaylistService.checkForUpdates(() => {
			chrome.tabs.create({ url: item.nextURL.stringify() });
		});
	}
}

PlaylistController.$inject = [
	'PlaylistService',
	'PlaylistItemFormService',
];



module.exports = PlaylistController;
