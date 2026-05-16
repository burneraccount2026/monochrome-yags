/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "https://noai.duckduckgo.com/?q={query}"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"DYFX2BPPsAML9UvR","label":"Linux","bookmarks":[{"id":"14c8h8IpwUlzjRMk","label":"Kernel Archives","url":"https://kernel.org/"},{"id":"gqSS7ZOwFOTy4psG","label":"Arch Wiki","url":"https://wiki.archlinux.org/title/Main_page"},{"id":"AVeyjTd5XuhCpXqp","label":"Distrowatch","url":"https://distrowatch.com/"},{"id":"kSifb1VqAqoHNHfJ","label":"Ask Ubuntu","url":"https://askubuntu.com/"}]},{"id":"oGGUH9MbuVr62K49","label":"Development","bookmarks":[{"id":"xdymO7gVUhTAqInD","label":"Explainshell","url":"https://explainshell.com/"},{"id":"iaIrnXUZ3kWwzsDg","label":"ShellCheck","url":"https://www.shellcheck.net/"},{"id":"bGyQ2ZbkU24oQOyK","label":"Crontab Guru","url":"https://crontab.guru/"},{"id":"QOsuuOEzOFx1gK7z","label":"Codeberg","url":"https://codeberg.org/"}]},{"id":"IptQTC2fX8feE3fj","label":"Subreddits","bookmarks":[{"id":"0MqNtnpm4e2AUgPE","label":"r/Linux","url":"https://www.reddit.com/r/linux/"},{"id":"yeRTwdmz9YgS38OD","label":"r/archlinux","url":"https://www.reddit.com/r/archlinux/"},{"id":"2HTc9gG5ZMC4Io7z","label":"r/arch","url":"https://www.reddit.com/r/arch/"},{"id":"zn5yxbiCx2AZecoW","label":"r/artixlinux","url":"https://www.reddit.com/r/artixlinux/"}]},{"id":"S0AhsIibLdeOjLfH","label":"Blogs","bookmarks":[{"id":"8KYne30LqO5Yqe4K","label":"Kernal","url":"https://kernal.eu/"},{"id":"gdgqByOZQkqUs07h","label":"Linux Blog","url":"https://linuxblog.io/"},{"id":"sCT4JSouZGn6hr3W","label":"OMG! Ubuntu","url":"https://www.omgubuntu.co.uk/"},{"id":"p3oVpE8RaA4v3WI3","label":"Tecmint","url":"https://www.tecmint.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
