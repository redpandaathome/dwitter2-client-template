export default class TweetService {
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }

  async getTweets(username) {
    const query = username? `?username=${username}`:''
    const response = await fetch(`${this.baseUrl}/tweets${query}`, {
      method: 'GET',
      headers: { 'Content-Type' : 'application/json'},
    })
    const data = await response.json();
    if ( response.status !== 200 ) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseUrl}/tweets`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      //✨
      body: JSON.stringify({text, name: 'Ellie', username: 'ellie'})
    });
    const data = await response.json();
    //✨
    if(response.status !== 201){
      throw new Error(data.message)
    }
    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseUrl}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    });

    //✨
    if(response.status !== 204){
      throw new Error(`Tweet id ${tweetId} can not be deleted`);
    }
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseUrl}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text})
    });

    const data = await response.json();
    if(response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
