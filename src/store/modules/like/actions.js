import api from '@/apis/api'

export const getUserLikes = async ({commit}, {username}) => {
    try {
        const res = await api.get('/user/' + username + '/likes');
        if (res.status === 200) {
            commit('GET_USER_LIKES', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const addLikeToPost = async ({commit}, {route_name, post}) => {
    try {
        const res = await api.post('/post/' + post.id + '/likes');
        if (res.status === 200) {
            // Se status 200, aggiungo il post a cui l'utente ha messo like alla lista dei post piaciuti (like.likes)
            commit('like/ADD_LIKE_TO_USERS_LIKES', post, { root: true })

            // Poi procedo ad aggiornare la grafica
            switch (route_name) {
                case 'home':
                    commit('feed/ADD_LIKE_TO_POST', post, { root: true});
                    break;
                case 'user.show':
                    commit('users/ADD_LIKE_TO_POST', post, { root: true});
                    break;
                case 'post.show':
                    commit('users/ADD_LIKE_TO_POST', post, { root: true});
                    break;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeLikeFromPost = async ({commit}, {route_name, post}) => {
    try {
        const res = await api.delete('/post/' + post.id + '/likes');
        if (res.status === 200) {
            // Se status 200, rimuovo il post a cui l'utente ha messo like dalla lista dei post piaciuti (like.likes)
            commit('like/REMOVE_LIKE_FROM_USERS_LIKES', post, { root: true })

            switch (route_name) {
                case 'home':
                    commit('feed/REMOVE_LIKE_FROM_POST', post, { root: true});
                    break;
                case 'user.show':
                    commit('users/REMOVE_LIKE_FROM_POST', post, { root: true});
                    break;
                case 'post.show':
                    commit('users/REMOVE_LIKE_FROM_POST', post, { root: true});
                    break;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const addLikeToReply = async ({commit}, {reply}) => {
    try {
        const res = await api.post('/reply/' + reply.id + '/likes');
        if (res.status === 200) {
            // Se status 200, aggiungo il post a cui l'utente ha messo like alla lista dei post piaciuti (like.likes)
            commit('like/ADD_LIKE_TO_USERS_LIKES', reply, { root: true })

            // Poi procedo ad aggiornare la grafica
            commit('reply/ADD_LIKE_TO_REPLY', reply, { root: true});
        }
    } catch (error) {
        console.log(error)
    }
}


export const removeLikeFromReply = async ({commit}, {reply}) => {
    try {
        const res = await api.delete('/reply/' + reply.id + '/likes');
        if (res.status === 200) {
            // Se status 200, rimuovo il post a cui l'utente ha messo like dalla lista dei post piaciuti (like.likes)
            commit('like/REMOVE_LIKE_FROM_USERS_LIKES', reply, { root: true })

            commit('reply/REMOVE_LIKE_FROM_REPLY', reply, { root: true});
        }
    } catch (error) {
        console.log(error)
    }
}

