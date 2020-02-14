// This listens for the user to click a class on the classList and loads the choice. It also updates characterSummary with the chosen class's information
$(`body`).on(`click`, `.btn_class`, function () {
    selectClass($(this).attr(`id`));
    activeClass(this);
});

function activeClass(clickedClass) {
    $('.current_class').removeClass("current_class");
    $(clickedClass).addClass('current_class');
}

function currentClassInformation(currentClass, spellCasting) {

    $('#class_info_container_left').append('<div class="general_info_styling" id="class_info_left"></div>');
    className(currentClass);
    classHDSave(currentClass);
    classProficiencies(currentClass);
    classOptionalProficiencies(currentClass);
    classSpellcasting(currentClass, spellCasting);
}

function className(currentClass) {
    $('#class_info_left').append(`<div class="class_info">
    <h4>${currentClass.name}</h4></div>`);
    characterSummary.characterClass = currentClass.name;
}

function classHDSave(currentClass) {
    $('#class_info_left').append(`<div class="class_info" id="class_info_hd_save"></div>`);
    $('#class_info_hd_save').append(`<div class="class_info_inline">
    <h6>Hit Dice:</h6>
    <h6>d${currentClass.hit_die}</h6></div>`);
    characterSummary.hitPoints = currentClass.hit_die + 

    $('#class_info_hd_save').append(`<div class="class_info_inline" id="class_saving_throws">
    <h6>Saving Throws:</h6>`);
    currentClass.saving_throws.forEach(element => {
        if (characterSummary.saves[`class_saves_0`] === undefined) {
            characterSummary.saves[`class_saves_0`] = {};
        }
        characterSummary.saves[`class_saves_0`][element.name] = element.name;
        $('#class_saving_throws').append(`<div class="class_save_list"><h6>${element.name}</h6><div>`);
    });
}

//Populate the proficency list and add values to characterProficencies Object
function classProficiencies(currentClass) {
    $(`#class_info_left`).append(`<div><h6>Proficencies</h6></div><div class="class_info class_prof_container" id="proficiencies"></div>`);
    currentClass.proficiencies.forEach(element => {
        $(`#proficiencies`).append(`<div class="class_list class_prof">
             <span id="class_${element.name}">${element.name}</span></div>`);
        if (unsortedProficiencies[`class_proficiencies_0`] === undefined) {
            unsortedProficiencies[`class_proficiencies_0`] = {};
        }
        else {
            unsortedProficiencies[`class_proficiencies_0`] = {};
        }
        unsortedProficiencies[`class_proficiencies_0`][`${element.name}`] = element.name;
    });
}

//Populate and create forms for proficency choices and add values to characterProficencies Object
function classOptionalProficiencies(currentClass) {
    $(`#class_info_left`).append(`<div class="class_info">
    <h6>Optional Class Proficencies</h6><div id="class_proficiencies"></div></div>`);
    currentClass.proficiency_choices.forEach((element, i) => {
        if (element.choose > 1) {
            $('#class_proficiencies').append(`<div class="class_prof_container" id="class_prof_list${i}">
            <p>Choose ${element.choose} proficiencies from this list</p></div>`);
            element.from.forEach(element => {
                $(`#class_prof_list${i}`).append(`<div class="class_list">
            <input type="checkbox" class="class_proficiencies_${i} checkbox_styling" value="${element.name}"><span> ${element.name}</span></div>`);
            });
            $(`.class_proficiencies_${i}`).on('change', function () {
                if ($(`.class_proficiencies_${i}:checked`).length > element.choose) {
                    this.checked = false;
                }
                else {
                    if (this.checked === true) {
                        if (unsortedProficiencies[`class_proficiencies_${i + 1}`] === undefined) {
                            unsortedProficiencies[`class_proficiencies_${i + 1}`] = {};
                        }
                        unsortedProficiencies[`class_proficiencies_${i + 1}`][this.value] = this.value;
                    }
                    else {
                        delete unsortedProficiencies[`class_proficiencies_${i + 1}`][this.value];
                    }
                    console.log(unsortedProficiencies);
                }
            });
        }
        else {
            $('#class_proficiencies').append(`<div class="class_prof_container" id="class_prof_options${i}">
        <div class="list_header">Choose ${element.choose} proficency from this list</div>
        <div><select id="class_prof_list${i}"></select></div>
        </div>`);
            element.from.forEach(element => {
                $(`#class_prof_list${i}`).append(`<option value="${element.name}">${element.name}</option>`);
            });
            $(`#class_prof_list${i}`).on('change', function () {
                unsortedProficiencies[`class_proficiencies_${i + 1}`] = {};
                unsortedProficiencies[`class_proficiencies_${i + 1}`][$(`#class_prof_list${i}`).children("option:selected").val()] = $(`#class_prof_list${i}`).children("option:selected").val();
                console.log(unsortedProficiencies);
            });
        }
    });
}

function classSpellcasting(currentClass, spellCasting) {
    if (currentClass.spellcasting !== undefined) {
        $('#class_info_container_right').append('<div class="general_info_styling" id="class_info_right"></div>');
        $('#class_info_right').append(`<div class="class_info" id="class_spellcasting">
    <h5>${currentClass.name} Spellcasting:</h5>`);
        spellCasting.info.forEach(element => {
            if (characterSummary.traits[`class_traits_spellcasting`] === undefined) {
                characterSummary.traits[`class_traits_spellcasting`] = {};
            }
            characterSummary.traits[`class_traits_spellcasting`][element.name] = element.name;
            $('#class_info_right').append(`<div class="class_info"><h6> ${element.name}</h6><p>${element.desc}</p></div>`);
        });
    }
}

function resetClass() {
    $(`#class_info_container_left`).empty();
    $(`#class_info_container_right`).empty();
    unsortedProficiencies['class_proficiencies_0'] = {};
    unsortedProficiencies['class_proficiencies_1'] = {};
    unsortedProficiencies['class_proficiencies_2'] = {};
    unsortedProficiencies['class_proficiencies_3'] = {};
}