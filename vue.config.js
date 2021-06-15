module.exports = {
  devServer: {
	  proxy: {
		  '^/api': {
			  target: process.env.PROXY_API_URL || 'http://localhost:8081/',
			  pathRewrite: {'^/api': ''}
		  },
		  '^/comment': {
			  target: process.env.PROXY_API_URL || 'http://localhost:8081/'
		  }
	  }
  }
}

