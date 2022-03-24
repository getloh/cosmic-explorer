

export const randomLoadGen = () => {
    let num = Math.floor(Math.random() * 10);

    switch(num){
        case 0:
            return "Firing up engines..";
        case 1:
            return "Sequence start in 5..";
        case 2:
            return "Prepping crew.."
        case 3:
            return "Launching satelite.."
        case 4:
            return "Preparing to lift off.."
        case 5:
            return "Calclating trajectory.."
        case 6:
            return "Venturing out.."
        case 7:
            return "Contacting mission control.."
        case 8:
            return "5..4..3..2..1.."
        default:
            return "Training astronauts.."
    }
}


export const youTubeRegex = (ytlink : string) => {  //* Extracts the youtube ID from a URL
    let youtubeId = "";
    const dotBe = "youtu.be/";  // for regex
    const slashWatch = "youtube.com/watch?";
    const findBe = ytlink.search(dotBe);  // Will probably return 8 if found, else -1
    const findWatch = ytlink.search(slashWatch);
    if (findBe !== -1){
      youtubeId = ytlink.slice(findBe + 9)
    }
    else {
      youtubeId = ytlink.slice(findWatch + 20);
    }
    let edgeCase = youtubeId.search("&")
    if (edgeCase !== -1){
      youtubeId = youtubeId.slice(0, edgeCase);
    }
    return youtubeId
  }