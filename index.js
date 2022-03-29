var List = Backbone.Model.extend({
    defaults: {
        name: '',
        age: '',
        mobile: '',
        email: ''
    }
});

var Collection_list = Backbone.Collection.extend({

});

var collection_list = new Collection_list();


var ListView = Backbone.View.extend({
    model: new List(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('#blogs-list-template').html())
        console.log('aaaa',this)
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

var viewLists = Backbone.View.extend({
    model: collection_list,
    el: $('.blogs-list'),
    initialize: function () {
        this.model.on('add', this.render, this);
    },
    render: function () {
        var self = this;
        console.log('bbbbb')
        this.$el.html('');
        _.each(this.model.toArray(), function (List) {
            self.$el.append((new ListView({ model: List })).render().$el);
        });
        return this;
    }
});

var ViewLists = new viewLists();

$(document).ready(function () {
    $('.add-list').on('click', function () {
        var list = new List({
            name: $('.name-input').val(),
            age: $('.age-input').val(),
            mobile: $('.mobile-input').val(),
            email: $('.email-input').val()
        });
        console.log(list)
        $('.name-input').val('');
        $('.age-input').val('');
        $('.mobile-input').val('');
        $('.email-input').val('');
        collection_list.add(list);
    });
})