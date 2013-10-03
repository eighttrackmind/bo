define (require, exports, module) ->

	Model = require 'bo.model'
	Pane = require 'bo.pane'

	extend = (one, two) ->
		for key, val in two
			one[key] = two[key]
		one

	one = (obj) ->
		return id for id of obj

	class Bo

		options:

			animationDuration: 200
			paneAttribute: 'data-bo-pane'
			paneTriggerAttribute: 'data-bo-trigger-pane'

		panes: {}
		state: new Model

		constructor: ->

			# load panes from DOM
			panes = document.querySelectorAll '[' + @options.paneAttribute + ']'

			# init panes
			for element, n in panes
				@registerPane element, n

			# show first pane
			@show one(@panes)

			# events
			document.addEventListener 'click', @click

		# {String|Number|DOMElement} element
		registerPane: (element, index) ->

			if typeof element is 'String' or typeof element is 'Number'
				opts =
					id: element

			else
				opts =
					element: element
					index: index

			opts = extend opts, @options
			pane = new Pane opts
			@panes[pane.id] = pane

		hideAll: ->

			for id, pane of @panes
				pane.right()

		show: (id) ->

			# sanity check
			# if not @panes[id]?
			# 	console.error 'Bo.show called with unregistered pane "' + id + '". Be sure to register it first!'

			# hide panes
			@hideAll()

			# show this pane
			@panes[id].show()

			# register it
			@state.set 'active', id

		click: (event) =>

			id = event.target.getAttribute @options.paneTriggerAttribute

			if id

				event.preventDefault()

				@show id