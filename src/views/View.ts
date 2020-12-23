import { Model } from '../models/Model';

/** generic class responsible for HTML rendering */
/** T: generics of this class 
 *  K: generics to be passed to a Model class that comes from this class K */
export abstract class View<T extends Model<K>, K> {
  //reference to some DOM element we want to nest in the template
  regions: { [key: string]: Element } = {};

  constructor(
    public parent: Element,
    public model: T
  ) {
    this.bindModel();
  }

  abstract template(): string;

  /** creates a list of regions to be rendered */
  regionsMap(): { [key: string]: string } {
    return {};
  }

  /** loops through regions and finds the elems matching selectors
   * found elems are injected into regions 
   */
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      this.regions[key] = fragment.querySelector(selector);
    }
  }

  /** map keys to the handlers */
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  /** optional convenience method for automatical 
   * nesting / injecting of dom elements
   * could be implemented in the child class  */
  onRender(): void { }

  /** trigger re-rendering on event 'change' - see the Model class*/
  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  /** binds events before they are inserted into DOM */
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let key in eventsMap) {
      const [eventName, selector] = key.split(':'); //"click:button": eventName = "click"; selector = "button"
      fragment.querySelectorAll(selector).forEach(el => {
        el.addEventListener(eventName, eventsMap[key]);
      })
    }
  }

  render(): void {
    //clean up HTML on each re-render first
    //note: React doesn't do that. It compares DOM elements instead
    //this is why we shouldn't mutate state in React
    this.parent.innerHTML = "";

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    //add event listeners
    this.bindEvents(templateElement.content);

    this.mapRegions(templateElement.content);

    //nests the DOM elements
    this.onRender();

    //add to the DOM
    this.parent.append(templateElement.content);
  }
}