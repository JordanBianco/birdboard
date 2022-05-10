export default {
    // l'utente scelto con cui chattare, messo nello state, perchè lo uso in più components
    selectedUser: null,

    typingUser: null,
    isTyping: false,

    onlineUsers: [],

    suggested: [],
    messages: [],
    
    page: 1,
    lastPage: null,
    
    conversations: [],
    
    success: false,
}