
const {onSessionCreated} = require("./firebase");
const {bot} = require("./telegram");

const classBandChatId = "-508107744";

onSessionCreated(async (session, creator) => {
   const message = `🤖 <i>${creator.userName}</i> just created a new session:
<b>${session.name}</b> 👋

Follow <a href="http://www.planb-react.web.app/">PlanB</a> to get more information`
   await bot.sendMessage(classBandChatId, message, {
      parse_mode: "HTML"
   });
});
