export class Book {
  private _id: number;
  private _title: string;
  private _author: string;
  private _publisher: string;
  private _publicationDate: string;
  private _language: string;
  private _category: string;
  private _numberOfPages: number;
  private _format: string;
  private _isbn: string;
  private _shippingWeight: number;
  private _listPrice: number;
  private _ourPrice: number;
  private _active: boolean;
  private _description: string;
  private _inStockNumber: number;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get publisher(): string {
    return this._publisher;
  }

  set publisher(value: string) {
    this._publisher = value;
  }

  get publicationDate(): string {
    return this._publicationDate;
  }

  set publicationDate(value: string) {
    this._publicationDate = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get numberOfPages(): number {
    return this._numberOfPages;
  }

  set numberOfPages(value: number) {
    this._numberOfPages = value;
  }

  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }

  get isbn(): string {
    return this._isbn;
  }

  set isbn(value: string) {
    this._isbn = value;
  }

  get shippingWeight(): number {
    return this._shippingWeight;
  }

  set shippingWeight(value: number) {
    this._shippingWeight = value;
  }

  get listPrice(): number {
    return this._listPrice;
  }

  set listPrice(value: number) {
    this._listPrice = value;
  }

  get ourPrice(): number {
    return this._ourPrice;
  }

  set ourPrice(value: number) {
    this._ourPrice = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get inStockNumber(): number {
    return this._inStockNumber;
  }

  set inStockNumber(value: number) {
    this._inStockNumber = value;
  }
}
