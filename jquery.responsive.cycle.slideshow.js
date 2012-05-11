/*
// Responsive Cycle SlideShow
// @author M. Mikkel Rummelhoff
// http://mmikkel.no
*/
(function(window){

	SlideShow.prototype.id = '';
	SlideShow.prototype.$container = null;
	SlideShow.prototype.$slides = null;
	SlideShow.prototype.orgWidth = -1;
	SlideShow.prototype.orgHeight = -1;
	SlideShow.prototype.$nav = null;
	SlideShow.prototype.$pager = null;
	SlideShow.prototype.$activeSlide = null;
	SlideShow.prototype.activeSlideIndex = 0;
	SlideShow.prototype.options = {
		fx:'fade',
		speed:'fast',
		slideResize:0
	};

	function SlideShow($container)
	{
		this.$container = $container;
		this.init();
	}

	SlideShow.prototype.init = function()
	{
		this.id = this.$container.attr('id');
		// Check if there's a nav or pager element present
		if(this.$container.children('.cycle-nav').length >= 1){
			this.$nav = this.$container.find('.cycle-nav:first');
			this.options.next = this.$nav.find('.cycle-nav-next:first');
			this.options.prev = this.$nav.find('.cycle-nav-prev:first');
		}
		if(this.$container.children('.cycle-pager').length >= 1){
			this.$pager = this.$container.find('.cycle-pager:first');
			this.$pager.empty();
			this.options.pager = this.$pager;
		}
		this.options.startingSlide = this.activeSlideIndex;
		this.options.width = this.$container.width();
		this.options.before = onSlideChange;
		// Init slideshow
		this.$slides = this.$container.children('.cycle-slides:first');
		this.$slides.show();
		this.$slides.cycle(this.options);
		// Get original dimensions
		if(this.orgWidth <= 0){
			this.orgWidth = this.$slides.width();
			this.orgHeight = this.$slides.height();
		}
	}
	
	SlideShow.prototype.update = function() // Call when width changes
	{
		if(this.$slides.width() !== this.$container.width()){ // Container width changed. Rebuild slideshow
			// Get the resize ratio
			var ratio = (Math.floor((this.$container.width() / this.orgWidth)*100))*.01;
			this.$slides.height(Math.floor(this.orgHeight * ratio));
			this.activeSlideIndex = this.$slides.find('.active').index();
			this.$slides.hide().cycle('destroy');
			this.init();
		}
	}
	
	function onSlideChange(currSlide,nextSlide)
	{
		jQuery(this).parent().find('.active').removeClass('active');
		jQuery(this).addClass('active');
	}

	window.SlideShow = SlideShow;

}(window)); // End SlideShow