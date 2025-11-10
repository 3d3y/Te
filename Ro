<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roblox Account Date Checker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        h1 {
            color: white;
            text-align: center;
            margin-bottom: 10px;
            font-size: 28px;
        }
        
        .subtitle {
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            margin-bottom: 30px;
            font-size: 16px;
        }
        
        .search-box {
            display: flex;
            margin-bottom: 20px;
        }
        
        input {
            flex: 1;
            padding: 15px 20px;
            border: none;
            border-radius: 10px 0 0 10px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.9);
            outline: none;
        }
        
        button {
            padding: 15px 25px;
            border: none;
            border-radius: 0 10px 10px 0;
            background: #ff4757;
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        button:hover {
            background: #ff3742;
        }
        
        #result {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 15px;
            padding: 25px;
            margin-top: 20px;
            display: none;
            color: white;
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .result-item {
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .result-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .copy-btn {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .error {
            color: #ff6b6b;
            text-align: center;
            margin-top: 15px;
        }
        
        .loading {
            text-align: center;
            color: white;
            margin: 20px 0;
        }
        
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 3px solid white;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Roblox Account Checker</h1>
        <p class="subtitle">Enter a Roblox username to find account creation date</p>
        
        <div class="search-box">
            <input type="text" id="username" placeholder="Enter Roblox username...">
            <button onclick="searchUser()">Search</button>
        </div>
        
        <div id="result">
            <!-- Results will be displayed here -->
        </div>
        
        <div class="footer">
            This tool uses the official Roblox API
        </div>
    </div>

    <script>
        async function searchUser() {
            const username = document.getElementById('username').value.trim();
            const resultDiv = document.getElementById('result');
            
            if (!username) {
                showError('Please enter a username!');
                return;
            }

            // Show loading state
            resultDiv.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    Searching for "${username}"...
                </div>
            `;
            resultDiv.style.display = 'block';

            try {
                // Step 1: Get User ID from username
                const idResponse = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
                
                if (!idResponse.ok) {
                    throw new Error('User not found');
                }
                
                const userData = await idResponse.json();

                if (userData.Id) {
                    // Step 2: Get user details including creation date
                    const infoResponse = await fetch(`https://users.roblox.com/v1/users/${userData.Id}`);
                    
                    if (!infoResponse.ok) {
                        throw new Error('Could not fetch user details');
                    }
                    
                    const userInfo = await infoResponse.json();

                    if (userInfo.created) {
                        const creationDate = new Date(userInfo.created);
                        const formattedDate = creationDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        const formattedTime = creationDate.toLocaleTimeString('en-US');
                        
                        resultDiv.innerHTML = `
                            <h3 style="margin-bottom: 20px; text-align: center;">✅ Account Found</h3>
                            <div class="result-item">
                                <span><strong>Username:</strong></span>
                                <span>${userData.Username}</span>
                                <button class="copy-btn" onclick="copyToClipboard('${userData.Username}')">Copy</button>
                            </div>
                            <div class="result-item">
                                <span><strong>User ID:</strong></span>
                                <span>${userData.Id}</span>
                                <button class="copy-btn" onclick="copyToClipboard('${userData.Id}')">Copy</button>
                            </div>
                            <div class="result-item">
                                <span><strong>Creation Date:</strong></span>
                                <span>${formattedDate}</span>
                                <button class="copy-btn" onclick="copyToClipboard('${formattedDate}')">Copy</button>
                            </div>
                            <div class="result-item">
                                <span><strong>Creation Time:</strong></span>
                                <span>${formattedTime}</span>
                                <button class="copy-btn" onclick="copyToClipboard('${formattedTime}')">Copy</button>
                            </div>
                            <div class="result-item">
                                <span><strong>Full Date:</strong></span>
                                <span>${userInfo.created}</span>
                                <button class="copy-btn" onclick="copyToClipboard('${userInfo.created}')">Copy</button>
                            </div>
                        `;
                    } else {
                        showError('Could not find creation date for this user');
                    }
                } else {
                    showError('User not found!');
                }
            } catch (error) {
                showError('User not found or connection error. Please try again.');
                console.error(error);
            }
        }

        function showError(message) {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<div class="error">❌ ${message}</div>`;
            resultDiv.style.display = 'block';
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary feedback
                const originalText = event.target.textContent;
                event.target.textContent = 'Copied!';
                setTimeout(() => {
                    event.target.textContent = originalText;
                }, 1500);
            });
        }

        // Allow searching with Enter key
        document.getElementById('username').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchUser();
            }
        });
    </script>
</body>
</html>
