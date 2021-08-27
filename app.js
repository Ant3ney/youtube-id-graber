/* This code can automaticly collect up to 30 video sources in a channel */
const puppeteer = require('puppeteer');
let channelVideosUrl = 'https://www.youtube.com/channel/UCZFFH3uCrG-vaG8q_dIIGcA/videos';
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(channelVideosUrl);
	const videoInfo = await page.evaluate(getVideoInfo);

	console.log(videoInfo);
	console.log(`${videoInfo.length} in total`);

	await browser.close();
})();

/* Copy and paste the contents of this function in a browser
containing a youtube channel with all its videos loaded. */
async function getVideoInfo() {
	let videos = document.querySelectorAll(
		'ytd-browse #contents #contents #items ytd-thumbnail .yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail'
	);
	let titleEles = document.querySelectorAll('#contents #contents #items #video-title');

	let srcAry = [];

	for (let i = 0; i < videos.length; i++) {
		let titleEle = titleEles[i];
		let videoTitle = titleEle.innerText;
		let videoInfo = {};
		let video = videos[i];
		let href = video.getAttribute('href');
		let vars = href.split('?')[1];
		let src = vars.split('v=')[1];

		videoTitle ? (videoInfo.title = videoTitle) : '';
		src ? (videoInfo.id = src) : '';
		srcAry.push(videoInfo);
	}

	return srcAry;
}
