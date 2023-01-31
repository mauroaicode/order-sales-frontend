export function isLoggedIn() {
  const token = localStorage.getItem('_current_token') || false;
  return token ? true : false;
}
export const guest = (loggedIn) =>{

    if (loggedIn){
      const login = loggedIn || false;
      return token ? true : false;
    // return this.$router.push({name: 'webapp'});
  }
}
