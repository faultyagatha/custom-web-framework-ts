import { Collection } from "../models/Collection";

/** generic abstract class for rendering into HTML */
export abstract class CollectionView<T, K> {
  constructor(
    public parent: Element,
    public collection: Collection<T, K>
  ) { }

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');

    for (let model of this.collection.models) {
      const wrapperElement = document.createElement('div');
      //generate the view for the element and render HTML
      this.renderItem(model, wrapperElement);
      //append HTML to our parent
      templateElement.content.append(wrapperElement);
    }
    this.parent.append(templateElement.content);
  }
}