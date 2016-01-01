/*
 * This is a way to guarantee that the target you add the eventListener on is
 * the same that you remove it from.
 *
 * Note: This can be removed when https://github.com/facebook/react/issues/285 is resolved:
 *       Not resolved as of 17.7.2015...
 */
class EventListener {
  listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false) // false -> during bubble phase, not capturing
      return {
        remove() {
          target.removeEventListener(eventType, callback, false)
        }
      }
    } else {
      console.log('tried to attach unknown event in EventListener')
    }
  }
}

export default new EventListener()
