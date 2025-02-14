export class Dropdown {

    constructor(id, callback) {
        this.id = id
        this._callback = callback
        this.container = document.getElementById(id)
        this.dropdownMenu = this.container.querySelector(`.dropdown-menu`)
        this.dropdownBtn = this.container.querySelector('.dropdown-btn')
        this.checkboxes = this.dropdownMenu.querySelectorAll('.option')
        this.initDropdown()
    }

    // Update button text based on selected options
    updateButtonLabel() {
        const selected = [...this.checkboxes].filter(cb => cb.checked).length
        this.dropdownBtn.textContent = selected > 0 ? `${selected} Kapitel ausgewählt` : 'Kapitel auswählen'

    }


    initDropdown() {
        // Toggle dropdown menu visibility when the button is clicked
        this.dropdownBtn.addEventListener('click', e => {
            this.dropdownMenu.classList.toggle('show')
            e.stopPropagation()
        })

        // Close the dropdown menu if clicking outside of it
        document.addEventListener('click', e => {
            if (!this.dropdownBtn.contains(e.target) && !this.dropdownMenu.contains(e.target)) {
                this.dropdownMenu.classList.remove('show')
            }
        })

        // Listen for changes in checkboxes
        this.checkboxes.forEach(cb => cb.addEventListener('change', () => {
            this.updateButtonLabel()
            if (this._callback) this._callback()
        }))

        this.updateButtonLabel()

    }
}