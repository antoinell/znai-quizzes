package org.testingisdocumenting.znai.extensions.select;

import com.jayway.jsonpath.JsonPath;
import org.testingisdocumenting.znai.core.AuxiliaryFile;
import org.testingisdocumenting.znai.core.ComponentsRegistry;
import org.testingisdocumenting.znai.extensions.PluginParams;
import org.testingisdocumenting.znai.extensions.PluginParamsDefinition;
import org.testingisdocumenting.znai.extensions.PluginParamsOpts;
import org.testingisdocumenting.znai.extensions.PluginResult;
import org.testingisdocumenting.znai.extensions.include.IncludePlugin;
import org.testingisdocumenting.znai.parser.ParserHandler;
import org.testingisdocumenting.znai.search.SearchScore;
import org.testingisdocumenting.znai.search.SearchText;

import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class CounterIncludePlugin implements IncludePlugin {

    @Override
    public String id() {
        return "znaicounter";
    }

    @Override
    public IncludePlugin create() {
        return new CounterIncludePlugin();
    }

    @Override
    public PluginParamsDefinition parameters() {
        return CounterPluginParams.definition;
    }

    @Override
    public PluginResult process(ComponentsRegistry componentsRegistry, ParserHandler parserHandler, Path markupPath, PluginParams pluginParams) {
        Map<String, Object> props = new LinkedHashMap<>(pluginParams.getOpts().toMap());
        PluginParamsOpts opts = pluginParams.getOpts();
        props.put("initialCount", opts.get("initialCount"));
        props.put("step", opts.get("step"));
        return PluginResult.docElement("ZnaiCounter", props);
    }

    @Override
    public Stream<AuxiliaryFile> auxiliaryFiles(ComponentsRegistry componentsRegistry) {
        return Stream.empty();
    }

    @Override
    public List<SearchText> textForSearch() {
        return List.of(SearchScore.STANDARD.text("znaiCounter"));
    }

}
