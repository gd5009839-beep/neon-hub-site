// Credenciais de acesso
const CREDENTIALS = {
  username: 'neon',
  password: 'hub123'
};

// Função de login
function login(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');
  
  // Verificar credenciais
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    // Login bem-sucedido
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    // Salvar sessão no localStorage
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('loginTime', new Date().getTime());
    
    errorMessage.textContent = '';
  } else {
    // Login falhou
    errorMessage.textContent = 'Usuário ou senha incorretos!';
    
    // Limpar campos
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    // Efeito visual de erro
    const form = document.querySelector('.login-form');
    form.style.animation = 'shake 0.5s';
    setTimeout(() => {
      form.style.animation = '';
    }, 500);
  }
}

// Função de logout
function logout() {
  document.getElementById('login-screen').style.display = 'block';
  document.getElementById('main-content').style.display = 'none';
  
  // Limpar campos do formulário
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  
  // Remover sessão do localStorage
  localStorage.removeItem('userLoggedIn');
  localStorage.removeItem('loginTime');
}

// Tornar as funções globais
window.login = login;
window.logout = logout;

// Verificar sessão ao carregar a página
function checkSession() {
  const isLoggedIn = localStorage.getItem('userLoggedIn');
  const loginTime = localStorage.getItem('loginTime');
  
  if (isLoggedIn === 'true' && loginTime) {
    const now = new Date().getTime();
    const sessionDuration = now - parseInt(loginTime);
    const maxSessionTime = 2 * 60 * 60 * 1000; // 2 horas
    
    if (sessionDuration < maxSessionTime) {
      // Sessão ainda válida
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
    } else {
      // Sessão expirada
      logout();
    }
  }
}

// Adicionar animação de shake para erro de login
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// Verificar sessão quando a página carregar
document.addEventListener('DOMContentLoaded', checkSession);