# Presence
Copy Steam's rich presence to Discord using given profiles.

## Requirements
- Node.js (v16.3.0 used in testing)
- Discord (desktop client)
- Steam account

## Getting Started
```bash
git clone git@github.com:ramadan8/Presence.git
cd Presence
npm i
```

Create a new file in the folder called `.env`. Within this file, place the following values, replacing the items in the double quotes with sensible values.

```
STEAM_USERNAME = "your_steam_username"
STEAM_PASSWORD = "your_steam_password"
```

**At this stage, OTP/Steam Guard support has not been implemented.**

From here, type `pm2 start index.js --no-autorestart` and the application will start running in the background. `--no-autorestart` acts as a safety net to not spam Steam's API with login requests.

## Profiles
All profiles are in the `./presence/games/` directory and listed briefly below. Please make a suitable pull request if you'd like to add more profiles.

- [Tower Unite](https://store.steampowered.com/app/394690/Tower_Unite/)