
window.apiculateConfig = {
	hosts: {
		"gist": "https://api.github.com",
	},
	endpoints: [
		{
			method: "GET",
			url: "/users/<<user>>/gists",
			paths: {
				"user": {
					description: "The user that you want to get the gists",
					type: "Number"
				}
			},
			params: [
				{key:"since", type: "String", description:"A timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Only gists updated at or after this time are returned."}
			],
			description: "List a user's gists:",
            auth: false,
			host: "gist",
			sampleResponse:{
				headers: [
				'Status: 200 OK',
				'Link: <https://api.github.com/resource?page=2>; rel="next",<https://api.github.com/resource?page=5>; rel="last"',
				'X-RateLimit-Limit: 5000',
				'X-RateLimit-Remaining: 4999'
				],
				body: '[\
  {\
    "url": "https://api.github.com/gists/5fd95b797c3236db05d4",\
    "forks_url": "https://api.github.com/gists/5eda5c8ab221ac939105/forks",\
    "commits_url": "https://api.github.com/gists/4a78a76aea93c91243d9/commits",\
    "id": "1",\
    "description": "description of gist",\
    "public": true,\
    "user": {\
      "login": "octocat",\
      "id": 1,\
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",\
      "gravatar_id": "somehexcode",\
      "url": "https://api.github.com/users/octocat",\
      "html_url": "https://github.com/octocat",\
      "followers_url": "https://api.github.com/users/octocat/followers",\
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",\
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",\
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",\
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",\
      "organizations_url": "https://api.github.com/users/octocat/orgs",\
      "repos_url": "https://api.github.com/users/octocat/repos",\
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",\
      "received_events_url": "https://api.github.com/users/octocat/received_events",\
      "type": "User",\
      "site_admin": false\
    },\
    "files": {\
      "ring.erl": {\
        "size": 932,\
        "filename": "ring.erl",\
        "raw_url": "https://gist.github.com/raw/365370/8c4d2d43d178df44f4c03a7f2ac0ff512853564e/ring.erl",\
        "type": "text/plain",\
        "language": "Erlang"\
      }\
    },\
    "comments": 0,\
    "comments_url": "https://api.github.com/gists/b2c39217d9b00a8daec3/comments/",\
    "html_url": "https://gist.github.com/1",\
    "git_pull_url": "git://gist.github.com/1.git",\
    "git_push_url": "git@gist.github.com:1.git",\
    "created_at": "2010-04-14T02:15:15Z",\
    "updated_at": "2011-06-20T11:34:15Z"\
  }\
]"'
			}
		},	{
			method: "GET",
			url: "/gists",
			params: [
				{key:"since", type: "String", description:"A timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Only gists updated at or after this time are returned."}
			],
			description: "List the authenticated user’s gists or if called anonymously, this will return all public gists",
            auth: true,
			host: "gist",
		},	{
			method: "GET",
			url: "/gists/public",
			params: [
				{key:"since", type: "String", description:"A timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Only gists updated at or after this time are returned."}
			],
			description: "List all public gists",
            auth: false,
			host: "gist",
		},	{
			method: "GET",
			url: "/gists/starred",
			params: [
				{key:"since", type: "String", description:"A timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Only gists updated at or after this time are returned."}
			],
			description: "List the authenticated user’s starred gists",
            auth: true,
			host: "gist",
		},	{
			method: "GET",
			url: "/gists/:id",
			paths: {
				id: {description: "The ID of the gist", type: "String"}
			},
			params: [
				{key:"since", type: "String", description:"A timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Only gists updated at or after this time are returned."}
			],
			description: "List the authenticated user’s starred gists",
            auth: true,
			host: "gist",
		},	{
			method: "POST",
			url: "/gists",
			body: [
				{}
			],
			description: "Create a gist",
            auth: false,
			host: "gist",
		},	{
			method: "PUT",
			url: "/gists/:id/star",
			description: "Star a gist",
            auth: false,
			host: "gist",
		},	{
			method: "DELETE",
			url: "/gists/:id/star",
			description: "Unstar a gist",
            auth: false,
			host: "gist",
		},	{
			method: "GET",
			url: "/gists/:id/star",
			description: "Check to see if a gist is starred",
            auth: false,
			host: "gist",
		},	{
			method: "POST",
			url: "/gists/:id/star",
			description: "Fork a gist. Note this was previously /gists/:id/fork",
            auth: false,
			host: "gist",
		},	{
			method: "DELETE",
			url: "/gists/:id",
			description: "Delete a gist",
            auth: false,
			host: "gist",
		},
	]
};
	