var listSerialized = [];

document.forms[0].addEventListener('submit', function(e) {
    if(listSerialized.length)
        document.getElementsByClassName('debug')[0].innerHTML = JSON.stringify(listSerialized);
    else 
        alert('List is empty');
        
    e.preventDefault();
    return false;
});

function buildAttributeItem(text) {
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(text));
    return listItem;
}

function isSmoker(smoker) {
    return smoker? 'yes': 'no';
}

function isAdult(age) {
    return age >= 18? 'Adult ': 'Child ';
}

function deleteMember(id) {
    var listItem = document.getElementById(id);

    if(listItem) {
        listItem.parentNode.removeChild(listItem);
        listSerialized.splice(parseInt(id.replace('member_', '')) - 1, 1);
    }
}

function buildAnchor(id, text) {
    var anchor = document.createElement('a');
    
    anchor.appendChild(document.createTextNode(text));
    anchor.setAttribute('href', '#');
    anchor.addEventListener('click', function() {
        deleteMember(`member_${id}`);
    });
    
    return anchor;
}

function buildItem(age, rel, smoker, id) {
    var listItem = document.createElement('li');
    var attributesList = document.createElement('ul');
    
    var ageItem = buildAttributeItem(`Age: ${age}`);
    var relItem = buildAttributeItem(`Relationship: ${rel}`);
    var smokerItem = buildAttributeItem(`Smoker: ${isSmoker(smoker)}`);
    
    attributesList.appendChild(ageItem);
    attributesList.appendChild(relItem);
    attributesList.appendChild(smokerItem);
    
    listItem.appendChild(document.createTextNode(isAdult(age)));
    listItem.appendChild(buildAnchor(id, '[delete]'));
    listItem.appendChild(attributesList);
    
    listItem.setAttribute('id', `member_${id}`);
    return listItem;
}

function Member(age, rel, smoker) {
    this.age = age;
    this.rel = rel;
    this.smoker = smoker;
}

function addMember(list, age, rel, smoker) {
    listSerialized.push(new Member(age, rel, smoker));
    var id = list.getElementsByTagName('ul').length + 1;
    list.appendChild(buildItem(age, rel, smoker, id));
}

document.getElementsByClassName('add')[0].addEventListener('click', function(e) {
    var age = document.getElementsByName('age')[0].value;
    var rel = document.getElementsByName('rel')[0].value;
    var smoker = document.getElementsByName('smoker')[0].checked;
    
    if(age <= 0 || !rel.length) {
        alert("age is required and > 0, relationship is required");
        e.preventDefault();
        return false;
    }
    
    var list = document.getElementsByClassName('household')[0];
        
    addMember(list, age, rel, smoker);
    document.forms[0].reset();
    
    e.preventDefault();
    return false;
});

