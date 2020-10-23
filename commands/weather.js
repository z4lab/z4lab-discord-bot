const superagent = require("superagent");
const cities = require("all-the-cities");
const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {

	if (args.length === 0) return message.channel.send('Please enter a city/village name!');

	let testArgs = args.join(" ");

	cities.sort(function(a,b) {return b.population - a.population;});

	let citiesArray = cities.filter(city => {
		return city.name.toLowerCase() === testArgs.toLowerCase();
	});

	if (citiesArray.length === 0) citiesArray = cities.filter(city => {
		return city.name.match(testArgs);
	});

	if (citiesArray.length === 0) return message.channel.send("Can't find a city/village!");

	let city = citiesArray[0];
	let coords = {lon: city.loc.coordinates[0], lat: city.loc.coordinates[1]};
	let apiUrl = "https://fcc-weather-api.glitch.me/api/current?";
	let settings = `lon=${Number(coords.lon)}&lat=${Number(coords.lat)}`;
	let request = apiUrl+settings;

	await getWeatherData(request, coords, message);

};

async function getWeatherData(request, coords, message) {

	let result = await superagent.get(request);
	result = result.body;

	if (Math.round(result.coord.lon * 10) === Math.round(coords.lon * 10) && Math.round(result.coord.lat * 10) === Math.round(coords.lat * 10)) {
		sendWeatherData(message, result);
	} else {
		await getWeatherData(request, coords, message);
	}

}

function sendWeatherData(message, res) {

	let embed = new RichEmbed()
		.setTitle(`Weather for ${res.name} / ${res.sys.country} @ ${new Date((Date.now()+((res.timezone-7200)*1000))).toLocaleString('en-US')}`)
		.setThumbnail(res.weather[0].icon)
		.setFooter("Last update")
		.setTimestamp(res.dt*1000)
		.addField(":thermometer: Cur. Temperature", `${Math.round(res.main.temp) || "N/A"}°C`, true)
		.addField(":white_sun_cloud: Weather State", res.weather[0].main || "N/A", true)
		.addField(":snowflake: Min. Temperature", `${Math.round(res.main.temp_min) || "N/A"}°C`, true)
		.addField(":fire: Max. Temperature", `${Math.round(res.main.temp_max) || "N/A"}°C`, true)
		.addField(":sweat_drops: Humidity", `${Math.round(res.main.humidity) || "N/A"}%`, true)
		.addField(":straight_ruler: Air Pressure", `${Math.round(res.main.pressure) || "N/A"}mbar`, true)
		.addField(":dash: Wind Speed", `${Math.round(res.wind.speed/3.6*100)/100 || "N/A"}m/s`, true)
		.addField(":dash: Wind Direction", `${Math.round(res.wind.deg) || "N/A"}°`, true)
		.addField(":sunrise: Sunrise", `${new Date((res.sys.sunrise+res.timezone)*1000).toLocaleString('en-US') || "N/A"}`, true)
		.addField(":city_sunset: Sunset", `${new Date((res.sys.sunset+res.timezone)*1000).toLocaleString('en-US') || "N/A"}`, true);

	return message.channel.send(embed);
}


module.exports.help = {
	name: "weather",
	category: "main",
	usage: [{
		command: "[city/village]",
		description: "displays the current weather for the given city/village"
	}],
	description: "displays the current weather for the given city/village",
	permissionLvl: 0
};