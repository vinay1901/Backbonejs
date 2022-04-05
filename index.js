var List = Backbone.Model.extend({
    defaults: {
        name: '',
        age: '',
        mobile: '',
        email: '',
        likes: 0
    }
});

var id_val = Backbone.Model.extend({
    defaults: {
        id: ''
    }
});

var idValue = new id_val();

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
        'click .like-btn': 'like',
        'click .edit-btn': 'edit',
        'click .delete-btn': 'delete',
    },
    like: function () {
        this.model.set({
            likes: this.model.get('likes') + 1
        });
    },
    edit: function () {
        console.log('edit', this.model, collection_list, idValue);
        $('.name-input').val(this.model.get('name'));
        $('.age-input').val(this.model.get('age')),
            $('.mobile-input').val(this.model.get('mobile')),
            $('.email-input').val(this.model.get('email'));
        $('.add-list').hide();
        $('.update-list').show();
        idValue.set('id', this.model.cid);
    },
    delete: function () {
        console.log('delete', this.model);
        this.model.destroy();
    }
});

var viewLists = Backbone.View.extend({
    model: collection_list,
    el: $('.blogs-list'),
    initialize: function () {
        // $('.update-list').hide();
        this.model.on('add', this.render, this);
        this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);

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

var ViewLists = new viewLists();

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
    $('.update-list').on('click', function () {
        collection_list.map(function(element, i) {
            if(idValue.get('id') === element.cid){
                collection_list.models[i].set('name', $('.name-input').val());
                collection_list.models[i].set('age', $('.age-input').val());
                collection_list.models[i].set('mobile', $('.mobile-input').val());
                collection_list.models[i].set('email', $('.email-input').val()); 
            }
        })
        $('.name-input').val('');
        $('.age-input').val('');
        $('.mobile-input').val('');
        $('.email-input').val('');
        $('.add-list').show();
        $('.update-list').hide();
    });
})