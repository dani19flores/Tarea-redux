export const addSong = (song,id) =>{
    return {
        type: "ADD_SONG",
        payload: {
            id,
            song,
            completed: false,
        }
    }
}

export const removeSong = (id) => {
    return {
        type: "REMOVE_ID",
        payload: id,
    }
}
