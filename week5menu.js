//Intro to JavaScript week 5 Coding Assignment
//John LeTard
//Making a Menu

class Player {
    constructor(name, uscfID){
        this.name = name;
        this.uscfID = uscfID;
    }

    describe() {
        return `${this.name} USCF ID: ${this.uscfID}.`;
    }
}

class Section {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player);
        } else {
            throw new Error(`You can only add an instance of Player.  Argument is not a player: ${player}`);
        }
    }

    describe() {
        let description = 'Section Name: ' + this.name + '\n';
        
        for (let i=0; i < this.players.length; i++) {
            description += i + ') ' + this.players[i].name + '\t\t\t USCF ID:' + this.players[i].uscfID +  '\n';
        }
        return description;
    }
}

class Menu {
    constructor() {
        this.sections = [];
        this.selectedSection = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createSection();
                    break;
                case '2':
                    this.editSection();
                    break;
                case '3':
                    this.deleteSection();
                    break;
                case '4':
                    this.displaySection();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt (`
          0) Exit
          1) Create New Section
          2) Edit Section
          3) Delete Section
          4) Display All Sections
        `);
    }

    showSectionMenuOptions(sectionInfo) {
        return prompt (`
        0) Back
        1) Add Player
        2) Deleate Player
        -----------------------------
        ${sectionInfo}
        `);
    }

    displaySection() {
        let sectionString = '';
        for (let i = 0; i < this.sections.length; i++){
            sectionString += i + ') ' + this.sections[i].name + '\n';
        }
        alert(sectionString);
    }

    createSection() {
        let name = prompt('Enter name for new section');
        this.sections.push(new Section(name));
    }


    editSection() {
        
        var editString = 'Enter index of the Section you wish to edit:\n';

        for (let i = 0; i < this.sections.length; i++){
            editString += i + ') ' + this.sections[i].name + '\n';
        }

        let index = prompt(editString);
        if (index> -1 && index < this.sections.length) {
            this.selectedSection = this.sections[index];
            let description = this.selectedSection.describe();
            let selection = this.showSectionMenuOptions(description);
            while (selection != 0){
                switch (selection) {
                    case '1':
                        this.createPlayer();
                        break;
                    case '2':
                        this.deletePlayer();
                    default:
                        selection = 0;
                }
                description = this.selectedSection.describe();
                selection = this.showSectionMenuOptions(description);    
            }
        }
    }

    deleteSection() {
        let index = prompt('Enter the index of the section you wish to delete:');
        if (index > -1 && index < this.sections.length) {
            this.sections.splice(index, 1);
        }
    }

    createPlayer() {
        let name = prompt('Enter name for the new player');
        let uscfID = prompt('Enter USCF ID for new player');
        this.selectedSection.players.push(new Player(name, uscfID));
    }

    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete:');
        if (index > -1 && index < this.selectedSection.players.length) {
            this.selectedSection.players.splice(index, 1);
        }
    }

}

let menu = new Menu();
menu.start();