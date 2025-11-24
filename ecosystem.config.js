module.exports = {
  apps: [
    {
      name: 'codgeni',
      script: 'npm',
      args: 'start',
      cwd: '/home/your-username/domains/yourdomain.com/public_html',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};

