export function MediaFactory(mediaData) {
  if (mediaData.image) {
    return new ImageMedia(mediaData);
  } else if (mediaData.video) {
    return new VideoMedia(mediaData);
  } else {
    throw new Error("Type de média inconnu");
  }
}

class ImageMedia {
  constructor(data) {
    this.data = data;
  }

  createMediaElement() {
    const img = document.createElement("img");
    img.src = `assets/photographers/${this.data.photographerId}/${this.data.image}`;
    img.alt = this.data.title;
    img.setAttribute("tabindex", "0");
    return img;
  }
}

class VideoMedia {
  constructor(data) {
    this.data = data;
  }

  createMediaElement() {
    const video = document.createElement("video");
    video.controls = true;
    video.setAttribute("tabindex", "0");

    const source = document.createElement("source");
    source.src = `assets/photographers/${this.data.photographerId}/${this.data.video}`;
    source.type = "video/mp4";

    video.appendChild(source);
    return video;
  }
}
