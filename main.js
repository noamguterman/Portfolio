const leftEye = document.getElementById('left-eye')
const rightEye = document.getElementById('right-eye')

document.addEventListener('mousemove', followCursor)
document.addEventListener('click', handleNavMenu)
document.getElementById('btn-theme').addEventListener('click', handleThemeButton)
window.addEventListener('blur', () => {
    document.documentElement.classList.add('window-out-of-focus');
})
window.addEventListener('focus', () => {
    document.documentElement.classList.remove('window-out-of-focus');
})

function handleNavMenu(e) {
    const navMenu = document.getElementById('nav-menu')
    const menuButton = e.target.closest('#btn-nav-menu')
    const clickedInsideMenu = e.target.closest('#nav-menu')
    const clickedLink = e.target.closest('#nav-menu a')

    if (menuButton) {
        navMenu.classList.toggle('hidden')
    } else if (clickedLink) {
        navMenu.classList.add('hidden')
    } else if (!clickedInsideMenu && !navMenu.classList.contains('hidden')) {
        navMenu.classList.add('hidden')
    }
}

function handleThemeButton() {
    const themeButton = document.getElementById('btn-theme')
    const currentTheme = localStorage.getItem('theme') || 'light'
    const body = document.body
    const projects = document.querySelectorAll('.project')
    const languages = document.querySelectorAll('.language')
    const certificates = document.querySelectorAll('.certificate')
    const tools = document.querySelectorAll('.tool')
    const cvBtn = document.getElementById('btn-cv')
    const nav = document.querySelector('nav')
    const navMenu = document.getElementById('nav-menu')
    const dividers = document.querySelectorAll('.divider')
    const btnNavMenu = document.getElementById('btn-nav-menu')
    const btnTheme = document.getElementById('btn-theme')
    const btnHome = document.getElementById('btn-home')
    const navA = document.querySelectorAll('.nav-a')
    const socialBtns = document.querySelectorAll('.social-btn')
    const educationContainer = document.getElementById('education-container')
    const experienceContainer = document.getElementById('experience-container')
    const dateElements = document.querySelectorAll('.date')

    themeButton.removeChild(themeButton.firstChild)

    if (currentTheme === 'light') {
        themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path></svg>`

        themeButton.classList.add('rotate-animation-reverse')
        setTimeout(() => {
            themeButton.classList.remove('rotate-animation-reverse')
        }, 200)
        
        body.classList.add('dark')
        projects.forEach(project => project.classList.add('dark'))
        languages.forEach(language => language.classList.add('dark'))
        certificates.forEach(certificate => certificate.classList.add('dark'))
        tools.forEach(tool => tool.classList.add('dark'))
        cvBtn.classList.add('dark')
        nav.classList.add('dark')
        navMenu.classList.add('dark')
        dividers.forEach(divider => divider.classList.add('dark'))
        btnNavMenu.classList.add('dark')
        btnTheme.classList.add('dark')
        btnHome.classList.add('dark')
        navA.forEach(a => a.classList.add('dark'))
        socialBtns.forEach(btn => btn.classList.add('dark'))
        document.documentElement.classList.add('dark')
        educationContainer.classList.add('dark')
        experienceContainer.classList.add('dark')
        dateElements.forEach(date => date.classList.add('dark'))

        localStorage.setItem('theme', 'dark')
    } else {
        themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path></svg>`

        themeButton.classList.add('rotate-animation')
        setTimeout(() => {
            themeButton.classList.remove('rotate-animation')
        }, 200)
        
        body.classList.remove('dark')
        projects.forEach(project => project.classList.remove('dark'))
        languages.forEach(language => language.classList.remove('dark'))
        certificates.forEach(certificate => certificate.classList.remove('dark'))
        tools.forEach(tool => tool.classList.remove('dark'))
        cvBtn.classList.remove('dark')
        nav.classList.remove('dark')
        navMenu.classList.remove('dark')
        dividers.forEach(divider => divider.classList.remove('dark'))
        btnNavMenu.classList.remove('dark')
        btnTheme.classList.remove('dark')
        btnHome.classList.remove('dark')
        navA.forEach(a => a.classList.remove('dark'))
        socialBtns.forEach(btn => btn.classList.remove('dark'))
        document.documentElement.classList.remove('dark')
        educationContainer.classList.remove('dark')
        experienceContainer.classList.remove('dark')
        dateElements.forEach(date => date.classList.remove('dark'))

        localStorage.setItem('theme', 'light')
    }
}

function followCursor(e) {
    const eyes = [leftEye, rightEye]
    
    // Calculate center point between eyes
    const leftRect = leftEye.getBoundingClientRect()
    const rightRect = rightEye.getBoundingClientRect()
    const centerX = (leftRect.left + rightRect.right) / 2
    const centerY = (leftRect.top + rightRect.bottom) / 2
    
    // Calculate distance from center point
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    // Limit movement range (same for both eyes)
    const moveX = Math.max(Math.min(distanceX / 5, 3), -9)
    const moveY = Math.max(Math.min(distanceY / 5, 3), -9)
    
    // Apply same translation to both eyes
    eyes.forEach(eye => {
        eye.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
}

function blink() {
    const eyes = [leftEye, rightEye]
    
    eyes.forEach(eye => {
        const currentTransform = eye.style.transform || 'translate(0, 0)'
        eye.style.transform = `${currentTransform} scaleY(0.1)`
        
        setTimeout(() => {
            eye.style.transform = currentTransform
        }, 150)
    })
}
// Initial blink
setTimeout(blink, 1000)

// Random blink interval
setInterval(() => {
    blink()
}, Math.random() * 5000 + 3500)