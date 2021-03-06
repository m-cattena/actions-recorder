import {fromEvent} from 'rxjs';
import {filter, throttleTime, map} from 'rxjs/operators';
import EnterKeyPressed from '../enter-key-pressed';

const ENTER_KEY_CODE = 13;

export default class EnterKeyPressEventHandler {
  constructor(sources) {
    this._events = fromEvent(sources, 'keypress', { capture: true })
      .pipe(
        filter((event) => event.key === ENTER_KEY_CODE || event.which === ENTER_KEY_CODE),
        throttleTime(500),
        map((event) => {return {event: event, processed: new EnterKeyPressed(event)};})
      );
  }

  get events() {
    return this._events;
  }
};
