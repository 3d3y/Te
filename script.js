// Proxy مجاني لـ Roblox API (يعمل بدون مشاكل)
const PROXY = 'https://api.allorigins.win/raw?url=';

async function searchPlayer() {
  const name = document.getElementById("searchInput").value.trim();
  if (!name) return alert("أدخل اسم اللاعب!");

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("playerCard").classList.add("hidden");
  document.getElementById("noResult").classList.add("hidden");

  try {
    // البحث عن ID اللاعب
    const searchUrl = `${PROXY}${encodeURIComponent(`https://search.jsons.pw/api/users/${name}`)}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const userId = searchData[0]?.id;

    if (!userId) throw new Error("غير موجود");

    // معلومات اللاعب الرئيسية
    const infoUrl = `${PROXY}${encodeURIComponent(`https://users.roblox.com/v1/users/${userId}`)}`;
    const infoRes = await fetch(infoUrl);
    const info = await infoRes.json();

    // إحصائيات إضافية (أصدقاء، RAP من rolimons proxy)
    const friendsUrl = `${PROXY}${encodeURIComponent(`https://friends.roblox.com/v1/users/${userId}/friends/count`)}`;
    const friendsRes = await fetch(friendsUrl);
    const friendsData = await friendsRes.json();

    const rapUrl = `${PROXY}${encodeURIComponent(`https://api.rolimons.com/players/${userId}`)}`;
    const rapRes = await fetch(rapUrl);
    const rapData = await rapRes.json();

    // آخر ظهور
    const badgeUrl = `${PROXY}${encodeURIComponent(`https://badges.roblox.com/v1/users/${userId}/badges/decades`)}`;
    const badgeRes = await fetch(badgeUrl);
    const badgeData = await badgeRes.json();

    // عرض البيانات
    document.getElementById("playerPhoto").src = info.avatar || `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=png`;
    document.getElementById("playerName").textContent = info.name;
    document.getElementById("displayName").textContent = info.displayName;
    document.getElementById("description").textContent = info.description || "لا يوجد وصف";
    document.getElementById("created").textContent = new Date(info.created).toLocaleDateString('ar-SA');
    document.getElementById("friendsCount").textContent = friendsData.count || 0;
    document.getElementById("rap").textContent = rapData.RAP || 0;
    document.getElementById("lastOnline").textContent = badgeData.lastAwarded || "غير معروف";
    document.getElementById("profileLink").href = `https://www.roblox.com/users/${userId}/profile`;

    document.getElementById("playerCard").classList.remove("hidden");
  } catch (error) {
    document.getElementById("noResult").textContent = "ما لقينا اللاعب أو مشكلة في الاتصال!";
    document.getElementById("noResult").classList.remove("hidden");
  }

  document.getElementById("loading").classList.add("hidden");
}

// بحث تلقائي عند الضغط Enter
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchPlayer();
});
