/********************************************************* 
 * LICENSE: GPL-3.0 https://www.gnu.org/licenses/gpl-3.0.txt
 * 
 * Author: Numberwolf - ChangYanlong
 * QQ: 531365872
 * QQ Group:925466059
 * Wechat: numberwolf11
 * Discord: numberwolf#8694
 * E-Mail: porschegt23@foxmail.com
 * Github: https://github.com/numberwolf/h265web.js
 * 
 * 作者: 小老虎(Numberwolf)(常炎隆)
 * QQ: 531365872
 * QQ群: 531365872
 * 微信: numberwolf11
 * Discord: numberwolf#8694
 * 邮箱: porschegt23@foxmail.com
 * 博客: https://www.jianshu.com/u/9c09c1e00fd1
 * Github: https://github.com/numberwolf/h265web.js
 * 
 **********************************************************/
/**
 * I420 420P
 * @return [y, u, v]
 */
function frameDataAlignCrop(
	line1, line2, line3,
	width, height, 
	buf_y, buf_u, buf_v) 
{
	let align = line1 - width;
	if (align == 0) {
		return [buf_y, buf_u, buf_v];
	} else {
		let luma_size = width * height;
		let chroma_size = luma_size / 4;

		// let min_align = width % 4;
		// if (min_align > 0) {
		// 	width += min_align;
		// }

		let new_y = new Uint8Array(luma_size);
		let new_u = new Uint8Array(chroma_size);
		let new_v = new Uint8Array(chroma_size);

		let luma_w = width;
		let chroma_w = width / 2;

		// luma
		for (let i = 0; i < height; i++) {
			new_y.set(buf_y.subarray(i * line1, luma_w), i * height);
		}

		// chromaB
		for (let i = 0; i < height / 2; i++) {
			new_u.set(buf_u.subarray(i * line2, chroma_w), i * height / 2);
		}

		// chromaR
		for (let i = 0; i < height / 2; i++) {
			new_v.set(buf_v.subarray(i * line3, chroma_w), i * height / 2);
		}

		return [new_y, new_u, new_v];
	}
}

module.exports = {
    frameDataAlignCrop : frameDataAlignCrop
};