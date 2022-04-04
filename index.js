var List = Backbone.Model.extend({
    defaults: {
        name: '',
        age: '',
        mobile: '',
        email: '',
        likes: 0
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
        _.bindAll(this, 'render', 'like')
        this.model.bind('change', this.render);
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .like-btn': 'like'
    },
    like: function (e) {
        this.model.set({
            likes: this.model.get('likes') + 1
        });

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
        this.$el.html('');
        _.each(this.model.toArray(), function (List, i) {
            self.$el.append((new ListView({ model: List })).render().$el);
        });
        return this;
    }
});

// var viewBlock = Backbone.View.extend({
//     el: $('.view-block'),
//     render: function () {
//         this.$el.html('display');
//         // // _.each(this.model.toArray(), function (List) {
//         //     self.$el.append((new ListView({ model: List })).render().$el);
//         // // });
//         // return this;
//     }
// });

var ViewLists = new viewLists();

// var ViewBlock = new viewBlock();
// ViewBlock.render();

$(document).ready(function () {
    $('.add-list').on('click', function () {
        var list = new List({
            name: $('.name-input').val(),
            age: $('.age-input').val(),
            mobile: $('.mobile-input').val(),
            email: $('.email-input').val()
        });
        $('.name-input').val('');
        $('.age-input').val('');
        $('.mobile-input').val('');
        $('.email-input').val('');
        collection_list.add(list);
    });
})