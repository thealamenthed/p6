export class MediaFactory {
  constructor(mediaData) {
    if (mediaData.image) {
      return new ImageMedia(mediaData);
    } else if (mediaData.video) {
      return new VideoMedia(mediaData);
    } else {
      throw new Error("Type de média inconnu");
    }
  }
}

class ImageMedia {
  constructor(data) {
    this.data = data;
  }

  createMediaElement() {
    const img = document.createElement("img");
    img.src = `assets/medias/photographers/${this.data.photographerId}/${this.data.image}`;
    img.alt = this.data.title;
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "img");
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
    video.setAttribute("aria-label", `Vidéo : ${this.data.title}`);
    video.setAttribute("title", `Vidéo : ${this.data.title}`);
    video.setAttribute("role", "group");

    const source = document.createElement("source");
    source.src = `assets/medias/photographers/${this.data.photographerId}/${this.data.video}`;
    source.type = "video/mp4";

    // Ajout d'un élément <track> pour les sous-titres
    const track = document.createElement("track");
    track.kind = "captions";
    track.label = "Sous-titres français";
    track.srclang = "fr";
    track.src = `assets/medias/photographers/${
      this.data.photographerId
    }/${this.data.video.replace(".mp4", ".vtt")}`; // Remplace le fichier vidéo par son fichier de sous-titres

    video.appendChild(source);
    video.appendChild(track);
    return video;
  }
}
