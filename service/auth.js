const sessionIdToUserMap = new Map();

function setUser(id, user){
    sessionIdToUserMap.set(id, user)
}