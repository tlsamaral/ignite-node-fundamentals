import { Readable } from "node:stream";
class OneToHundredStream extends Readable {
	index = 1;
	_read() {
		const i = this.index++;

		setTimeout(() => {
			if (i > 5) {
				this.push(null);
			} else {
				this.push(Buffer.from(String(i)));
			}
		}, 1000);
	}
}

fetch("http://localhost:3334", {
	method: "POST",
	body: new OneToHundredStream(),
	duplex: "half",
})
	.then((response) => {
		return response.text();
	})
	.then((data) => {
		console.log(data);
	});
