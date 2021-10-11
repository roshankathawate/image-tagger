export default{
    port: 1234,
    host:"localhost",
    dbConnectionUri:"mongodb://localhost:27017/image-tagger",
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    saltRound: 10,
    privateKey:`somerandomekey`
}