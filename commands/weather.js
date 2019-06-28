const superagent = require("superagent");
const cities = require("all-the-cities");
const fixTime = require("../util/fixTime");
const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (args.length === 0) return;

    let testArgs = args.join(" ");

    cities.sort(function(a,b) {return b.population - a.population});

    var citiesArray = [];

    citiesArray = cities.filter(city => {
        return city.name.toLowerCase() == testArgs.toLowerCase();
    }); 

    if (citiesArray.length == 0) citiesArray = cities.filter(city => {
        return city.name.match(testArgs);
    });

    if (citiesArray.length == 0) return message.channel.send("Can't find a city!");

    var city = citiesArray[0];

    var apiUrl = "https://fcc-weather-api.glitch.me/api/current?";

    var settings = `lon=${Number(city.lon)}&lat=${Number(city.lat)}`;

    var request = apiUrl+settings;

    let res = await superagent.get(request);

    res = res.body;
    
    var embed = new RichEmbed()
        .setTitle(`Weather @ ${res.name} / ${res.sys.country}`)
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

};

module.exports.help = {
    name: "weather",
};