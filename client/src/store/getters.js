export default {
    user: state => state.user,
    
    users: state => state.users,
    
    connections: state => state.connections,
    
    conversations: state => state.conversations,
    
    currentConversation: state => state.currentConversation,
    
    messages: state => id => {
        return state.conversations.filter(conv => conv._id === id)[0]?.messages
    },
    
    onlineUsers: state => state.onlineUsers,
   
    timelinePosts: (state) => {
        return state.timelinePosts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
    },
    
    posts: state => state.posts,
    
    currentProfile: state => {
        return state.users.filter(user => user.id === state.currentProfile)[0]
    }, 

    token: state => state.token,
    
    newNotification: state => state.newNotification,
}