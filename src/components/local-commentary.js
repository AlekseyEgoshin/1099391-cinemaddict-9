export default class LocalCommentary {
  constructor(data) {
    this.comment = data.commentary;
    this.date = data.date;
    this.emotion = data.emotion;
  }

  toRAW() {
    return {
      'comment': this.comment,
      'date': this.date,
      'emotion': this.emotion
    };
  }
}
