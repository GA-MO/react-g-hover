export default function getMousePosition(e, dom) {
  const bound = dom.getBoundingClientRect()
  const pageScroll = {
    left: document.body.scrollLeft + document.documentElement.scrollLeft,
    top: document.body.scrollTop + document.documentElement.scrollTop
  }
  const mousepos = {
    x: e.clientX + pageScroll.left,
    y: e.clientY + pageScroll.top
  }
  const mouseposInDOM = {
    x: mousepos.x - bound.left - pageScroll.left,
    y: mousepos.y - bound.top - pageScroll.top
  }
  return mouseposInDOM
}
