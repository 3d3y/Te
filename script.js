
const ROPROXY = 'https://api.roproxy.com/';

async function searchPlayer() {
  const name = document.getElementById("searchInput").value.trim();
  if (!name) return alert("أدخل اسم اللاعب!");

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("playerCard").classList.add("hidden");
  document.getElementById("noResult").classList.add("hidden");

  try {
    // 1️⃣ البحث عن اللاعب (username search)
    const searchRes = await fetch(`${ROPROXY}https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [name], excludeBannedUsers: true })
    });
    const searchData = await searchRes.json();
    const user = searchData.data[0];

    if (!user) throw new Error("ما لقينا اللاعب");

    const userId = user.id;

    // 2️⃣ معلومات اللاعب الرئيسية
    const infoRes = await fetch(`${ROPROXY}https://users.roblox.com/v1/users/${userId}`);
    const info = await infoRes.json();

    // 3️⃣ عدد الأصدقاء
    const friendsRes = await fetch(`${ROPROXY}https://friends.roblox.com/v1/users/${userId}/friends/count`);
    const friendsData = await friendsRes.json();

    // 4️⃣ صورة اللاعب (thumbnail رسمي)
    const thumbRes = await fetch(`${ROPROXY}https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`);
    const thumbData = await thumbRes.json();
    const photoUrl = thumbData.data[0]?.imageUrl || `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=png`;

    // 5️⃣ قيمة المخزون (RAP) من Rolimons (مع proxy إذا لزم)
    let rap = 0;
    try {
      const rapRes = await fetch(`https://api.rolimons.com/players/${userId}`);
      const rapData = await rapRes.json();
      rap = rapData.RAP || 0;
    } catch (e) {
      console.log("RAP غير متوفر");
    }

    // 6️⃣ آخر ظهور (presence)
    let lastOnline = "غير معروف";
    try {
      const presenceRes = await fetch(`${ROPROXY}https://presence.roblox.com/v1/presence/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: [userId] })
      });
      const presenceData = await presenceRes.json();
      const userPresence = presenceData.userPresences[0];
      if (userPresence.lastLocation) {
        lastOnline = userPresence.lastLocation;
      } else if (userPresence.userPresenceType === 1) {
        lastOnline = "متصل الآن";
      }
    } catch (e) {
      console.log("Presence غير متوفر");
    }

    // عرض البيانات
    document.getElementById("playerPhoto").src = photoUrl;
    document.getElementById("playerName").textContent = info.username;
    document.getElementById("displayName").textContent = info.displayName || "لا يوجد";
    document.getElementById("description").textContent = info.description || "لا يوجد وصف";
    document.getElementById("created").textContent = new Date(info.created).toLocaleDateString('ar-SA');
    document.getElementById("friendsCount").textContent = friendsData.count || 0;
    document.getElementById("rap").textContent = rap;
    document.getElementById("lastOnline").textContent = lastOnline;
    document.getElementById("profileLink").href = `https://www.roblox.com/users/${userId}/profile`;

    document.getElementById("playerCard").classList.remove("hidden");
  } catch (error) {
    document.getElementById("noResult").textContent = "ما لقينا اللاعب أو مشكلة في الاتصال! (جرب اسم إنجليزي)";
    document.getElementById("noResult").classList.remove("hidden");
    console.error(error); // شوف الخطأ في Console لو تبي
  }

  document.getElementById("loading").classList.add("hidden");
}

// بحث تلقائي عند Enter
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchPlayer();
});
